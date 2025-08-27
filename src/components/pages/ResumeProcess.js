import React, { useState, useContext, useRef, useEffect } from 'react';
import { DContext } from '../../context/Datacontext';

export const ResumeProcess = () => {
    const { BeURL } = useContext(DContext);
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);
    const [running, setRunning] = useState(false);
    const logEndRef = useRef(null);
    const sourceRef = useRef(null);

    const startProcessing = () => {
        if (running) return;
        setLogs([]);
        setProgress(0);
        setRunning(true);

        const es = new EventSource(`${BeURL}/process-resumes`);
        sourceRef.current = es;

        es.onmessage = (e) => {
            const { progress: p, message } = JSON.parse(e.data);
            if (typeof p === 'number') setProgress(p);
            setLogs((prev) => [...prev, { progress: p, message }]);
            if (p === 100) {
                es.close();
                setRunning(false);
            }
        };

        es.onerror = () => {
            console.error('SSE error');
            setRunning(false);
            es.close();
        };
    };

    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    useEffect(() => () => {
        if (sourceRef.current) sourceRef.current.close();
    }, []);

    return (
        <div className="max-w-3xl min-h-[80vh] mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Resume Processing</h2>
            <button
                onClick={startProcessing}
                disabled={running}
                className={`px-5 py-2 rounded-lg text-white font-medium mb-4 transition-colors ${running ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {running ? 'Processing...' : 'Start Processing'}
            </button>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                <div
                    className="h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`, backgroundColor: '#2563EB' }}
                />
            </div>

            <div className="h-64 overflow-auto bg-gray-50 p-4 rounded border border-gray-200">
                {logs.map((log, idx) => (
                    <div key={idx} className="text-sm mb-2">
                        <span className="font-medium text-blue-600">
                            {log.progress != null ? `${log.progress}%:` : '—:'}
                        </span>{' '}
                        <span>{log.message}</span>
                    </div>
                ))}
                <div ref={logEndRef} />
            </div>
        </div>
    );
}


