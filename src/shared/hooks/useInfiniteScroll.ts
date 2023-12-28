import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
/**
 * `useInfiniteScroll` is a custom hook that enables infinite scrolling functionality.
 * It uses the Intersection Observer API to detect when the last element of a list comes into the viewport.
 * When the last element is in the viewport, it triggers a callback function to fetch more data.
 *
 * @param {Function} callback - The function to call when the last element is in the viewport.
 * This function is typically used to fetch more data and add it to the list.
 *
 * @returns {Function} A function that takes a node (the last element in your list) and observes it with the IntersectionObserver.
 * When the node comes into the viewport, the callback function is called.
 *
 * @example
 * import useInfiniteScroll from './useInfiniteScroll';
 *
 * const MyComponent = () => {
 *   const [listData, setListData] = useState(initialData);
 *   const [lastElementRef] = useInfiniteScroll(fetchMoreListItems);
 *
 *   function fetchMoreListItems() {
 *     fetch('/api/moreListItems').then((newListItems) => {
 *       setListData((prevListData) => [...prevListData, ...newListItems]);
 *     });
 *   }
 *
 *   return (
 *     <div>
 *       {listData.map((listItem, index) => (
 *         <div key={index} ref={index === listData.length - 1 ? lastElementRef : null}>
 *           {listItem}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 */
const useInfiniteScroll = (
  callback: VoidFunction,
  scrollableElementRef?: React.RefObject<HTMLElement>,
): [Dispatch<SetStateAction<Element | null>>] => {
  const observer = useRef<IntersectionObserver | null>(null)
  const [lastElement, setLastElement] = useState<Element | null>(null)
  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback()
      }
    })

    if (lastElement) observer.current.observe(lastElement)
  }, [lastElement, scrollableElementRef])

  return [setLastElement]
}

export { useInfiniteScroll }
