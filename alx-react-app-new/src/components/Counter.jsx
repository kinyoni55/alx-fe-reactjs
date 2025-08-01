import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);

    return (
        <div>
            <p>Current Count: {count}</p>
            <button onClick={() => setCount(count +1)}>Increment</button>
            <button onClick={() => setCount(count -1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );    
}