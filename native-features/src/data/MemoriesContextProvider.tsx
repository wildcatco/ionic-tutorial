import React, { useState } from 'react';
import MemoriesContext, { Memory } from './memories-context';

const MemoriesContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  const addMemory = (
    path: string,
    base64Data: string,
    title: string,
    type: 'good' | 'bad'
  ) => {
    const newMemory: Memory = {
      id: Math.random().toString(),
      title,
      type,
      imagePath: path,
      base64Url: base64Data,
    };
    setMemories((curMemories) => {
      return [...curMemories, newMemory];
    });
  };

  return (
    <MemoriesContext.Provider
      value={{
        memories,
        addMemory,
      }}
    >
      {props.children}
    </MemoriesContext.Provider>
  );
};

export default MemoriesContextProvider;
