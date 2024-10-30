import { useState } from "react"

export function DropArea({onDrop}) {

    const [showDrop, setShowDrop] = useState(false)

    return (
        <section 
            onDragEnter={() => setShowDrop(true)} 
            onDrop={() => {
                onDrop();
                setShowDrop(false)
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={() => setShowDrop(false)} 
            className={showDrop ? "montserrat-regular text-sm text-gray-600 py-4 h-12 px-1 rounded mb-3 border border-dashed border-gray-600 opacity-1 transition-all ease-in" : "opacity-0"}
        >
            Soltar aquí
        </section>
    )
}