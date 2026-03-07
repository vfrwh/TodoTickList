import { useState, useEffect } from 'react';
import { getCaptachaAPI } from '@/apis/forget';

const useCaptcha = () => {
  const [image, setImage] = useState<string>('');
  const [ captchaId, setCaptchaId ] = useState<string>('');

  const fetchCaptcha = async () => {
      try {
        const res = await getCaptachaAPI();
        const base64Image = res.data.image.startsWith('data:') 
        ? res.data.image 
        : `data:image/png;base64,${res.data.image}`;
        setImage(base64Image);
        setCaptchaId(res.data.captchaId); 
      } catch (error) {
        console.error('Failed to fetch captcha:', error);
      }
      
    };

    useEffect(() => {
      fetchCaptcha();
    }, []);
    return { image, captchaId,fetchCaptcha }
}

export { useCaptcha }