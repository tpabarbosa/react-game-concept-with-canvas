import { createContext } from 'react';

const CanvasContext = createContext<CanvasRenderingContext2D | null>(null);

export default CanvasContext;