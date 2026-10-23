import { createContext, useContext } from 'react';

// Shared by the dev-only edit host (EditHost) and the editable fields. In the
// built site there is no provider, so the context stays null.

export interface FieldHandle {
  save: () => Promise<void>;
  uploadDir: string; // where images added to this field are stored, e.g. "blog/<id>"
}

export interface EditContextValue {
  editing: boolean;
  // `editor` is a TipTap Editor; typed loosely so this module stays free of TipTap.
  setActive: (id: string | null, editor: unknown) => void;
  register: (id: string, handle: FieldHandle) => () => void;
  markDirty: (id: string) => void;
  saveField: (id: string) => Promise<void>;
  reportError: (message: string) => void;
}

export const EditContext = createContext<EditContextValue | null>(null);
export const useEditContext = () => useContext(EditContext);

export async function devPost(url: string, body: BodyInit, json = true) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': json ? 'application/json' : 'application/octet-stream' },
    body,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}
