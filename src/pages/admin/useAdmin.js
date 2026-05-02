import { useState, useEffect, useCallback } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/site`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json);
    } catch {
      setData(null);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const saveSection = async (section, value) => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/site/${section}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(value),
      });
      if (!res.ok) throw new Error();
      setData(prev => ({ ...prev, [section]: value }));
      return true;
    } catch {
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveAll = async (newData) => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/site`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error();
      setData(newData);
      return true;
    } catch {
      return false;
    } finally {
      setSaving(false);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API}/api/admin/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error();
    return res.json();
  };

  const uploadGallery = async (files) => {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    const res = await fetch(`${API}/api/admin/upload/gallery`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error();
    const result = await res.json();
    setData(prev => ({ ...prev, gallery: result.gallery }));
    return result;
  };

  const deleteGalleryItem = async (id) => {
    const res = await fetch(`${API}/api/admin/gallery/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error();
    setData(prev => ({ ...prev, gallery: prev.gallery.filter(g => g.id !== id) }));
  };

  return { data, loading, saving, saveSection, saveAll, uploadFile, uploadGallery, deleteGalleryItem, refetch: fetchData };
}

export function useTranslations() {
  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('admin_token');

  const fetchTranslations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/translations`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error();
      setTranslations(await res.json());
    } catch {
      setTranslations(null);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => { fetchTranslations(); }, [fetchTranslations]);

  const saveLang = async (lang, data) => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/translations/${lang}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setTranslations(prev => ({ ...prev, [lang]: { ...prev[lang], ...data } }));
      return true;
    } catch {
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { translations, loading, saving, saveLang, refetch: fetchTranslations };
}
