import React from "react";

const Progressbar = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
        height: 20,
        width: '80%',
        backgroundColor: "#d8d8d8",
        borderRadius: 50,
        margin: 50,
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        transition: 'width 1s ease-in-out',
        borderRadius: 'inherit',
        textAlign: 'center',
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default Progressbar;

