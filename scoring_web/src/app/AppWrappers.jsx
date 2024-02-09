'use client';
import React, { Fragment } from 'react';
import "../styles/App.css"
import '../styles/Contact.css';
import '../styles/MiniCalendar.css';
import '../styles/index.css';

import dynamic from 'next/dynamic';

const _NoSSR = ({ children }) => <Fragment>{children}</Fragment>;

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

export default function AppWrappers({ children }) {
  return <NoSSR>{children}</NoSSR>;
}
