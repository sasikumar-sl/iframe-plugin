import { useEffect, useRef, useState } from "preact/hooks";

export default function Tree() {
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState({test: 1});
    const inputRef = useRef(null);

    const handleSendClick = () => {
        // You can handle sending the input value here, for example, by logging it to the console.
        console.log('Input Value:', inputValue);
    
        window.parent.postMessage(
          {
            methodName: 'button-click',
            data: inputValue,
          },
          '*',
        );
        setInputValue('');
      };
    
      useEffect(() => {
        const handler = (
          ev: MessageEvent<{ methodName: string; data: string }>,
        ) => {
          console.log('============ ev: ', ev.data);
          if (typeof ev.data !== 'object') return;
          if (!ev.data?.methodName) return;
    
          setMessage((value) => ({
            ...value,
            [ev.data?.methodName]: ev.data?.data,
          }));
        };
    
        self.addEventListener('message', handler);
    
        // Don't forget to remove addEventListener
        return () => self.removeEventListener('message', handler);
      }, []);

    return(<section class="p-0 m-0 w-full h-full">
         <div className="p-10 flex items-center justify-center space-x-10">
            <input
            class="p-2 border border-gray-300 rounded mr-10 w-48 text-sm"
            type="text"
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue((e?.target as HTMLInputElement)?.value)}
            ref={inputRef}
            />
            <button type="button" class="p-2 bg-blue-500 text-white rounded cursor-pointer text-sm" onClick={handleSendClick}>
            Send to parent
            </button>
        </div>
        <section class="w-100 p-10 min-w-full bg-cyan-500 hover:bg-cyan-800  border-slate-800 hover:border-slate-900 rounded shadow-lg shadow-blue-500/40 hover:shadow-indigo-500/40">
            <code>{JSON.stringify(message, null, 2)}</code>
        </section>
    </section>)
}