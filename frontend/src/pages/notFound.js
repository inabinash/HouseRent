import React from "react";

const NotFound = () => {
    return (
        <div style={styles.container}>
            <p style={styles.loaderText}>Page not Found</p>
        </div>
    );
};
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white", // Primary color
    },
    loaderText: {
        fontSize: "1.5rem",
        color: "Black", // Secondary color
        fontWeight: "bold",
    },
};
export default NotFound;