
const MainCard = ({title, children})=>{
    return <div className="basis-full flex flex-col shadow-xl p-[10px] m-[10px] rounded-lg">
        <div className="">
            <h2 className="m-[5px] font-semibold">{title}</h2>
        </div>
        <div className="m-[5px]">
            {children}
        </div>
    </div>
}

export default MainCard
