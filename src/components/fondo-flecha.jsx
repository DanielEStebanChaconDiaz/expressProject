import { useNavigate } from 'react-router-dom';

export default function FondoFlecha(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    return(
        <div className="back-button-maki">
            <img src="../../public/img/flecha1-craft.svg" alt="" className='flecha2'/> 
            {/* <i className="bx bx-arrow-back" onClick={handleClick}></i> */}
        </div>
    )
}