import React from 'react'

export default function pageNotFound() {
    return (
        <div className="text-center my-5">
            <h1>404 - Page Not Found</h1>
            <p>The page you’re looking for doesn’t exist.</p>
            <a href="/" className="btn btn-primary mt-3">Go Home</a>
        </div>
    )
}