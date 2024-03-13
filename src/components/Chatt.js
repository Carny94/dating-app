

export default function Chat({ descendingOrderMessages }) {
    return (
        <>
            <div className="chat-display">
                {descendingOrderMessages.map((message, index) => (
                    <div key={index}>
                        <div className="chat-message-header">
                            <div className="img-container">
                                <img src={message.img} alt={message.first_name + ' profile'} />
                            </div>
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
