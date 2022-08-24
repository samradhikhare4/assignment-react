export default function ShowBid({bids, showMin}) {
    if (showMin) {
        return (
         <span>{Math.min(...bids)}</span> 
        )
    }
    return (
        <span>{Math.max(...bids)}</span>
    )
}