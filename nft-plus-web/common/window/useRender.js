import React, { useRef, useEffect } from 'react'

export function useRender() {
  return {} 
}

export function useFirstRender() {
    const isFirstRenderRef = useRef(true);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  return isFirstRenderRef.current;
}

