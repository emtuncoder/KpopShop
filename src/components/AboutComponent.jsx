import React from 'react'

const AboutComponent = () => {
    return (

        <div>
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">About Us</h2>
                <p className="text-lg leading-relaxed mb-4">
                    At <span className="font-semibold">KpopShop</span>, we believe that K-pop is more than music —
                    it's a culture, a passion, and a lifestyle. Founded by a team of devoted fans, our mission is
                    to connect global K-pop lovers with official, high-quality merchandise from their favorite
                    artists.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    Whether you're a collector, a new fan, or a longtime stan, our curated collections, new
                    arrivals, and exclusive items are here to keep your love for K-pop alive. From albums and
                    lightsticks to fashion and accessories, every item is 100% authentic and shipped with care.
                </p>
                <p className="text-lg leading-relaxed">
                    Thank you for trusting KpopShop — where K-pop dreams come true.
                </p>
            </div>
        </div>
    )
}

export default AboutComponent
