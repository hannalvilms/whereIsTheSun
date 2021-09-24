import React  from 'react';
import {Icon} from "@iconify/react";
import {history} from '../App';

export default function Cache(input) {
    let i = 0;
    /*
    const [inputVal, setInputVal] = useState("");
    const browserHistory = useHistory();

    const search = () => {
        if (input) {
            fetch(`${api.base}weather?q=${input.history.location.state.name}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setInputVal(result);
                    console.log(result);
                    //browserHistory.push("/weather", result);
                })
        }
    }
    */
    return (
        <div>
            {/*Map through cache*/}
            {history.length !== 0 && (
                <div className="container row recent-views">
                    <p className="col-9">Recently viewed</p>
                    {history.slice(0, 5).map((history, key) => {
                        return <div  key={i++} className="cache col-6">
                            <h3>{history}</h3>
                            <h5>Check weather</h5>
                            <Icon icon="akar-icons:arrow-right" />
                        </div>
                    })}
                </div>
            )}
        </div>
    )
}