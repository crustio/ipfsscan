import {useEffect, useMemo, useState} from "react";

export class ParallaxItem {
  value = false
}

export interface UseParallax {
  data: ParallaxItem[]
}

export default function useParallax(interval: number, count: number, deep: any[] = []): UseParallax {
  const initList = useMemo(() => {
    const list: ParallaxItem[] = []
    for (let i = 0; i < count; i++) list.push(new ParallaxItem())
    return list
  }, [count])

  const [data, setData] = useState(initList)

  useEffect(() => {
    let index = count + 1
    const task = setInterval(async () => {
      if (index >= initList.length) {
        index -= 1;
        return;
      }
      if (index < 0) {
        clearInterval(task)
        return;
      }
      initList[index].value = true
      setData([...initList])
      index -= 1
    }, 100)
    return () => clearInterval(task)
  }, [initList, interval, count, ...deep])

  return useMemo(() => ({data}), [data])
}
