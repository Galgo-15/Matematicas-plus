import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ChevronDown, ChevronUp, Move } from 'lucide-react';

interface GeometryGraphProps {
  width?: number;
  height?: number;
  showGrid?: boolean;
}

const GeometryGraph: React.FC<GeometryGraphProps> = ({ 
  width = 600, 
  height = 400,
  showGrid = true
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedShape, setSelectedShape] = useState<string>('square');
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  const shapes = [
    { id: 'square', name: '🟦 Cuadrado' },
    { id: 'rectangle', name: '📏 Rectángulo' },
    { id: 'triangle', name: '📐 Triángulo' },
    { id: 'circle', name: '⭕ Círculo' }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Agregar cuadrícula si está activada
    if (showGrid) {
      const xGrid = d3.range(0, innerWidth, 20);
      const yGrid = d3.range(0, innerHeight, 20);

      g.selectAll('.gridX')
        .data(xGrid)
        .enter()
        .append('line')
        .attr('class', 'gridX')
        .attr('x1', d => d)
        .attr('y1', 0)
        .attr('x2', d => d)
        .attr('y2', innerHeight)
        .style('stroke', '#e5e7eb')
        .style('stroke-opacity', 0.5);

      g.selectAll('.gridY')
        .data(yGrid)
        .enter()
        .append('line')
        .attr('class', 'gridY')
        .attr('x1', 0)
        .attr('y1', d => d)
        .attr('x2', innerWidth)
        .attr('y2', d => d)
        .style('stroke', '#e5e7eb')
        .style('stroke-opacity', 0.5);
    }

    // Dibujar la forma seleccionada
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;

    switch (selectedShape) {
      case 'square':
        g.append('rect')
          .attr('x', centerX - dimensions.width / 2)
          .attr('y', centerY - dimensions.width / 2)
          .attr('width', dimensions.width)
          .attr('height', dimensions.width)
          .attr('fill', 'none')
          .attr('stroke', 'indigo')
          .attr('stroke-width', 2);

        // Mostrar medidas
        g.append('text')
          .attr('x', centerX)
          .attr('y', centerY + dimensions.width / 2 + 20)
          .attr('text-anchor', 'middle')
          .text(`Lado: ${dimensions.width}`)
          .style('font-size', '12px');

        g.append('text')
          .attr('x', centerX)
          .attr('y', centerY + dimensions.width / 2 + 40)
          .attr('text-anchor', 'middle')
          .text(`Área: ${dimensions.width * dimensions.width}`)
          .style('font-size', '12px');
        break;

      case 'rectangle':
        g.append('rect')
          .attr('x', centerX - dimensions.width / 2)
          .attr('y', centerY - dimensions.height / 2)
          .attr('width', dimensions.width)
          .attr('height', dimensions.height)
          .attr('fill', 'none')
          .attr('stroke', 'indigo')
          .attr('stroke-width', 2);

        // Mostrar medidas
        g.append('text')
          .attr('x', centerX)
          .attr('y', centerY + dimensions.height / 2 + 20)
          .attr('text-anchor', 'middle')
          .text(`Base: ${dimensions.width}, Altura: ${dimensions.height}`)
          .style('font-size', '12px');

        g.append('text')
          .attr('x', centerX)
          .attr('y', centerY + dimensions.height / 2 + 40)
          .attr('text-anchor', 'middle')
          .text(`Área: ${dimensions.width * dimensions.height}`)
          .style('font-size', '12px');
        break;

      case 'triangle':
        const trianglePoints = [
          [centerX - dimensions.width / 2, centerY + dimensions.height / 2],
          [centerX + dimensions.width / 2, centerY + dimensions.height / 2],
          [centerX, centerY - dimensions.height / 2]
        ];

        g.append('path')
          .attr('d', d3.line()(trianglePoints))
          .attr('fill', 'none')
          .attr('stroke', 'indigo')
          .attr('stroke-width', 2);

        // Mostrar medidas
        g.append('text')
          .attr('x', centerX)
          .attr('y', centerY + dimensions.height / 2 + 20)
          .attr('text-anchor', 'middle')
          .text(`Base: ${dimensions.width}, Altura: ${dimensions.height}`)
          .style('font-size', '12px');

        g.append('text')
          .attr('x', centerX)
          .attr('y', centerY + dimensions.height / 2 + 40)
          .attr('text-anchor', 'middle')
          .text(`Área: ${(dimensions.width * dimensions.height) / 2}`)
          .style('font-size', '12px');
        break;

      case 'circle':
        const radius = dimensions.width / 2;
        g.append('circle')
          .attr('cx', centerX)
          .attr('cy', centerY)
          .attr('r', radius)
          .attr('fill', 'none')
          .attr('stroke', 'indigo')
          .attr('stroke-width', 2);

        // Mostrar medidas
        g.append('text')
          .attr('x', centerX)
          .attr('y', centerY + radius + 20)
          .attr('text-anchor', 'middle')
          .text(`Radio: ${radius}`)
          .style('font-size', '12px');

        g.append('text')
          .attr('x', centerX)
          .attr('y', centerY + radius + 40)
          .attr('text-anchor', 'middle')
          .text(`Área: ${(Math.PI * radius * radius).toFixed(2)}`)
          .style('font-size', '12px');
        break;
    }

  }, [selectedShape, dimensions, width, height, showGrid]);

  return (
    <div className="space-y-4 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedShape}
          onChange={(e) => setSelectedShape(e.target.value)}
          className="p-2 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        >
          {shapes.map(shape => (
            <option key={shape.id} value={shape.id}>
              {shape.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions(prev => ({ ...prev, width: Number(e.target.value) }))}
          placeholder="Ancho"
          className="p-2 border-2 border-indigo-300 rounded-lg w-24 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          min="10"
          max="200"
        />
        {selectedShape !== 'square' && selectedShape !== 'circle' && (
          <input
            type="number"
            value={dimensions.height}
            onChange={(e) => setDimensions(prev => ({ ...prev, height: Number(e.target.value) }))}
            placeholder="Alto"
            className="p-2 border-2 border-indigo-300 rounded-lg w-24 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            min="10"
            max="200"
          />
        )}
      </div>
      
      <div className="text-center text-indigo-600 font-medium animate-pulse">
        ¡Explora y aprende con las formas! 🎨
      </div>
      
      <svg 
        ref={svgRef}
        width={width}
        height={height}
        className="border-2 border-indigo-200 rounded-xl bg-white shadow-inner"
      />
    </div>
  );
};

export default GeometryGraph; 