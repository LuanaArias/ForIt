import './LoadingScreen.css';

export function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="loader-content">
                <div className="spinner"></div>
                <p className="loader-text">Cargando Taskify...</p>
            </div>
        </div>
    );
}