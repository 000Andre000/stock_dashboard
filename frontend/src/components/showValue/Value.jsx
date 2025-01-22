const Value=({portVal})=>{
    return(
        <div>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mb-10 shadow-lg shadow-blue-200/50">
        <div className="grid grid-cols-2 rounded-sm sm:grid-cols-2 ">
        <div className="flex justify-center items-center text-center">
            <h1 className="mb-6 text-3xl font-semibold text-black dark:text-white">Total Invested:</h1>
            </div>
            <h1 className="mb-6 text-5xl font-semibold text-lime-500">${portVal}</h1>
           
        </div>
     </div>
        </div>
    );
};
export default Value;