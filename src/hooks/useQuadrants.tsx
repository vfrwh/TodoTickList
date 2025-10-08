import { useCallback, useEffect, useMemo, useState } from "react"
import { getQuadrantsAPI } from "@/apis/quadrantsData"

const useQuadrants = () => {
  const [number1,setNumber1] = useState<number>(0)
  const [number2,setNumber2] = useState<number>(0)
  const [number3,setNumber3] = useState<number>(0)
  const [number4,setNumber4] = useState<number>(0)
  const [content1,setContent1] = useState<string | null>(null)
  const [content2,setContent2] = useState<string | null>(null)
  const [content3,setContent3] = useState<string | null>(null)
  const [content4,setContent4] = useState<string | null>(null)

  const total = useMemo(() => {
    const numbers = [number1, number2, number3, number4]
    return numbers.reduce((sum, current) => sum + current, 0)
  }, [number1, number2, number3, number4])

  const getQuadrantsData = useCallback(async () => {
    try {
      const res = await getQuadrantsAPI()
      const { title1,title2,title3,title4 } = res.data
      setNumber1(title1.number)
      setNumber2(title2.number)
      setNumber3(title3.number)
      setNumber4(title4.number)
      
      setContent1(title1.content)
      setContent2(title2.content)
      setContent3(title3.content)
      setContent4(title4.content)

    } catch (error) {
      console.error('Failed to load data:', error);
    }
  },[])

  useEffect(()=> {
    getQuadrantsData()
  },[])

  return {
    total,
    number1,
    number2,
    number3,
    number4,
    content1,
    content2,
    content3,
    content4,
  }
}

export { useQuadrants }