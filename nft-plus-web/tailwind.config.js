module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./styles/_base.css"
  ],
  theme: {
    screens: {       
      'xs': '360px',       
      's' : '520px',       
      'sm': '600px',      
      'md': '728px',      
      'lg': '984px',        
      'xl': '1240px',           
      '2xl': '1410px',      
    },  
    container: {
      screens: {
        xs: '360px',
        xsm: '520px',
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1410px',
      },
    },
    fontFamily: {
      noto: ['Noto Sans KR', 'sans-serif'],
      mont: ['Montserrat', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        nogoon: '#4e4e4e',
        transWhite: 'rgba(255 , 255 , 255 , 0)',
        transBlack: 'rgba(0 , 0 , 0 , .4)',
        mainColor: '#0b0b0b',
        tabColor: '#fa0000',
        borderGray: 'rgb(217, 217, 217)',
        pinky: '#FE25D5' ,
        gray: {
          'base': '#E0E6E8'
        }
      },
      backgroundImage: {
        'profile-banner': "url('/pBanner.png')"
      },
      borderWidth:{
        '1.5':'1.5px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}