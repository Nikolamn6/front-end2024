import { useEffect, useState} from 'react'

const useColorModeDefault = () => {
    // localStorage.setItem('color-theme', 'light');
    const [colorMode, setColorMode] = useState(localStorage.getItem('color-theme'));

    localStorage.setItem('color-theme', colorMode);

    useEffect(() => {
      const className = 'dark';
      const bodyClass = window.document.body.classList;
  
      colorMode === 'dark'
        ? bodyClass.add(className)
        : bodyClass.remove(className);
    }, [colorMode]);
  
    return [colorMode, setColorMode];
}

export default useColorModeDefault