import React from 'react'

const mapFunction = () => {

  const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [routeInfo, setRouteInfo] = useState("");
    const [position, setPosition] = useState([16.047079, 108.20623]); // initial map center
    const mapRef = useRef();
    const [reload, setReload] = useState(false);
    const [distance, setDistance] = useState(0);
    const [resrep, setResrep] = useState({
        startPoint: startPoint,
        endPoint: endPoint,
        timeStart: '',
        accountId: '',
        driverDetailId: '',
        amount: "",
        paymentMethod: '2'
    });

    const handleShowMap = (groupCar) => {
        setCheckMap(true)
        geocodeAddress(groupCar.startPoint, (start) => {
          setStartPoint(start);
          geocodeAddress(groupCar.endPoint, (end) => {
            setEndPoint(end);
            setResrep({ ...resrep, startPoint: start.lat, endPoint: end.lat });
    
          });
        });
      };
  return (
    <div>mapFunction</div>
  )
}

export default mapFunction
export {handleShowMap}
    
