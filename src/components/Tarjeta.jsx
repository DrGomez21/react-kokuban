
export function Tarjeta({ title, description, tags, assignedTo }) {
    return (
        <div className="bg-[#F5FF70] border-[3px] border-[#121212] hover:shadow-[.4rem_.4rem_#121212] hover:cursor-pointer duration-150 p-4 w-full shadow-md relative">
          <h2 className="text-lg montserrat-semibold mb-1">{title}</h2>
          <p className="text-sm mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 ">
              <span className="bg-[#4F1DDE] text-white border border-[#121212] px-2 py-1 rounded-sm text-xs montserrat-regular">
                {tags}
              </span>
            {/* {tags.map((tag, index) => (
              <span key={index} className="bg-[#4F1DDE] text-white border border-[#121212] px-2 py-1 rounded-sm text-xs montserrat-regular">
                {tag}
              </span>
            ))} */}
          </div>
          {assignedTo && (
            <div className="bg-[#F0CA81] px-2 mt-1 w-auto py-1 rounded-full text-xs montserrat-regular border border-[#121212]">
              {/* Asignado a {assignedTo} */}
              {assignedTo}
            </div>
          )}
        </div>
    );
}
