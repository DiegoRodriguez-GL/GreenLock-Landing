// src/components/ui/Logo.tsx
interface LogoProps {
  color?: string;
  width?: number;
  height?: number;
}

export default function Logo({ color = '#17993f', width = 150, height = 40 }: LogoProps) {
  return (
    <div className="flex items-center">
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 150 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Esto es un SVG simplificado del logo, deberías reemplazarlo con el logo real */}
        <path 
          d="M20 10C14.5 10 10 14.5 10 20C10 25.5 14.5 30 20 30C25.5 30 30 25.5 30 20C30 14.5 25.5 10 20 10ZM25 21H21V25H19V21H15V19H19V15H21V19H25V21Z" 
          fill={color} 
        />
        <path 
          d="M45 13V27H42V13H45ZM60 20C60 23.9 56.9 27 53 27H47V13H53C56.9 13 60 16.1 60 20ZM57 20C57 17.8 55.2 16 53 16H50V24H53C55.2 24 57 22.2 57 20ZM75 27H72L67 20.7L65 23V27H62V13H65V19.5L71.7 13H74.5L68.5 18.7L75 27ZM85 16H80V18.5H84.5V21.5H80V24H85V27H77V13H85V16ZM100 13H103V27H100L94 19V27H91V13H94L100 21V13ZM113 27H107V13H110V24H113V27ZM125 16H120V18.5H124.5V21.5H120V24H125V27H117V13H125V16ZM134 21H131V27H128V13H134C137.3 13 140 15.7 140 17C140 18.3 139.3 19.4 138.2 20C139.3 20.6 140 21.7 140 23V27H137V23C137 22.4 136.6 22 136 22H134V21ZM134 18.7C135.2 18.7 136 18.2 136 17.2C136 16.2 135 16 134 16H131V18.7H134Z" 
          fill={color} 
        />
      </svg>
    </div>
  );
}