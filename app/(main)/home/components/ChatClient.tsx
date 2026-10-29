'use client';
import React, { useState, useRef } from 'react';

type Msg = { role: string; content: string };

function parseSSEChunk(chunk: string) {
  const lines = chunk.split(/\r?\n/).map((l) => l.trim());
  const dataLines = lines.filter((l) => l.startsWith('data:')).map((l) => l.replace(/^data:\s?/, ''));
  return dataLines;
}

export default function ChatClient() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function send() {
    const prompt = inputRef.current?.value ?? '';
    if (!prompt) return;
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    if (inputRef.current) inputRef.current.value = '';

    const res = await fetch('/api/openai/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
    });
    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let assistantText = '';
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const dataParts = parseSSEChunk(chunk);
        for (const part of dataParts) {
          if (part === '[DONE]') {
            continue;
          }
          let parsed = part;
          try {
            const obj = JSON.parse(part);
            parsed = (obj.choices?.[0]?.delta?.content as string) ?? obj.choices?.[0]?.text ?? part;
          } catch (e) {
            // not JSON
          }
          assistantText += parsed;
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (last?.role === 'assistant') {
              copy[copy.length - 1] = { role: 'assistant', content: assistantText };
            } else {
              copy.push({ role: 'assistant', content: assistantText });
            }
            return copy;
          });
        }
      }
    } catch (err) {
      console.error('Stream error', err);
    }
  }

  return (
    <div style={{ marginTop: 12 }} className="card">
      <h4>Chat</h4>
      <div style={{ maxHeight: 200, overflow: 'auto', padding: 8, border: '1px solid rgba(255,255,255,0.02)' }}>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input ref={inputRef} placeholder="Say something..." />
        <button className="button" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
