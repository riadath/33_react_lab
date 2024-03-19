import React, { useState } from 'react';
import Textbox from './components/textbox';
import TaskManager from './components/taskManager'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/textbox" element={<Textbox/>}/>
        <Route path="/task-manager" element={<TaskManager/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
