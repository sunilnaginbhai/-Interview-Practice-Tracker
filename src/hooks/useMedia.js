import { useEffect, useRef, useState } from "react";
import { get, set, del } from "idb-keyval";

const LINKS_KEY = "ipt:links:v1";
const META_KEY = "ipt:media:meta";

const useMedia = () => {
    const [media, setMedia] = useState([]);
    const urlsRef = useRef(new Set());
    const [links, setLinks] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(LINKS_KEY)) || [];
        } catch {
            return [];
        }
    });

    // Load media blobs from IndexedDB on mount
    useEffect(() => {
        let cancelled = false;
        const urls = urlsRef.current;
        const createUrl = (blob) => {
            if (!blob) return null;
            const url = URL.createObjectURL(blob);
            urls.add(url);
            return url;
        };
        (async () => {
            const meta = (await get(META_KEY)) || [];
            const loaded = await Promise.all(
                meta.map(async (m) => {
                    const blob = await get(`ipt:media:${m.id}`);
                    if (cancelled) return { ...m, url: null };
                    return {
                        ...m,
                        url: createUrl(blob),
                    };
                })
            );
            if (!cancelled) setMedia(loaded);
        })();
        return () => {
            cancelled = true;
            urls.forEach((url) => URL.revokeObjectURL(url));
            urls.clear();
        };
    }, []);

    // Persist links to LocalStorage
    useEffect(() => {
        localStorage.setItem(LINKS_KEY, JSON.stringify(links));
    }, [links]);

    const addMedia = async (file, title, type) => {
        const id = crypto.randomUUID();
        await set(`ipt:media:${id}`, file);
        const meta = (await get(META_KEY)) || [];
        const newMeta = [...meta, { id, title, type, createdAt: Date.now() }];
        await set(META_KEY, newMeta);
        const url = URL.createObjectURL(file);
        urlsRef.current.add(url);
        setMedia((prev) => [
            ...prev,
            { id, title, type, url },
        ]);
    };

    const deleteMedia = async (id) => {
        await del(`ipt:media:${id}`);
        const meta = (await get(META_KEY)) || [];
        await set(META_KEY, meta.filter((m) => m.id !== id));
        setMedia((prev) => {
            const removed = prev.find((item) => item.id === id);
            if (removed?.url) {
                URL.revokeObjectURL(removed.url);
                urlsRef.current.delete(removed.url);
            }
            return prev.filter((m) => m.id !== id);
        });
    };

    const addLink = ({ label, url }) => {
        setLinks((prev) => [
            ...prev,
            { id: crypto.randomUUID(), label, url },
        ]);
    };

    const deleteLink = (id) => {
        setLinks((prev) => prev.filter((l) => l.id !== id));
    };

    return { media, links, addMedia, deleteMedia, addLink, deleteLink };
};

export default useMedia;