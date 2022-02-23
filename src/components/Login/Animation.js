import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/calendar.json';

export default function Animation() {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            PreserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Lottie
                options={defaultOptions}
                width={454.21}
                height={440.76}
            />
        </div>
    )
}