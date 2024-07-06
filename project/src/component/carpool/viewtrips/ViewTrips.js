import React from 'react'

const ViewTrips = () => {
    useEffect(() => {
        loadGroupCar();
    }, []);
    const loadGroupCar = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/public/groupCars`);
            setGroupCars(result.data);
        } catch (error) {
            console.error('Failed to fetch group cars:', error);
        }
    };
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full sm:w-[90%] md:w-[80%] lg:w-[90%] mx-auto">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div></div>
          <label htmlFor="table-search" className="sr-only">Search</label>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">GroupId</th>
              <th scope="col" className="px-6 py-3">Start Point</th>
              <th scope="col" className="px-6 py-3">End Point</th>
              <th scope="col" className="px-6 py-3">TimeStart</th>
              <th scope="col" className="px-6 py-3">Members</th>
              <th scope="col" className="px-6 py-3">Driver</th>
              <th scope="col" className="px-6 py-3">Capacity</th>
              <th scope="col" className="px-6 py-3">Quantity</th> 
              <th scope="col" className="px-6 py-3">Join</th>
              <th scope="col" className="px-6 py-3">Show Map</th>

            </tr>
          </thead>
          <tbody>
            {groupCars?.map((groupCar) => (
              
                
                  <tr key={groupCar.groupId} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{groupCar.groupId}</td>
                    <td className="px-6 py-4">{groupCar.startPoint}</td>
                    <td className="px-6 py-4">{groupCar.endPoint}</td>
                    <td className="px-6 py-4">{formatDate(groupCar.timeStart)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleMembers(groupCar.groupId)}
                        className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-orange-700 text-white"
                      >
                        Members
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        onClick={() => countDown(groupCar.groupId)}
                        className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-green-700 text-white"
                      >
                        Driver
                      </Link>
                    </td>
                    
                    <td className="px-6 py-4">{groupCar.capacity}</td>
                    <td className="px-6 py-4">{groupCar.customers?.length ?? 0}</td>
                    
                    <td className="px-6 py-4">
                    <button
                        className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-blue-700 text-white"
                        onClick={()=>handleJoin(groupCar.groupId)}
                      >
                        Join
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="flex flex-row w-[180px] font-Roboto font-bold rounded-md justify-center items-center h-[52px] bg-pink-500 text-white"
                        onClick={()=>handleShowMap(groupCar)}
                      >
                        Show Map
                      </button>
                    </td>
                  </tr>

            ))}
          </tbody>
        </table>
      </div>
        </div>
    )
}

export default ViewTrips