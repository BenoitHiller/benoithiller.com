import React from 'react';
import Navigation from '@/app/parsing/_components/Navigation';

async function Sidebar() {
  return (
    <>
      {/*
        This empty div is here so that the page properly scrolls to the top after navigation.
        Otherwise the sticky element being the only contents causes problems.
        */}
      <div />
      <div className="py-6 pr-2 h2-100%/14 fixed scrollbar-thin overflow-y-auto md:border-r border-gray-950/5 w-[inherit] flex flex-col gap-4">
        <Navigation />
      </div>
    </>
  );
}

export default Sidebar;
