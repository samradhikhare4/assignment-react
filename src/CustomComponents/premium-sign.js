import preminumIcon from './../premium.png';

export default function Premium({hasPremium}) {
    if (hasPremium) {
        return (
            <img src={preminumIcon} className="App-logo" alt="logo" />
        )
    }
    return (
        <div>
            <img src={preminumIcon} className="App-logo no-premium-logo" alt="no-premium-logo" />
        </div>
    )
}