import React, {useState, useEffect} from 'react'

const Carousal2 = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

//   const { handleFileUpdate, userData, setUserData, createUser, inputRef, createUserLoader, siteData } = useContext(AppContext);

//   const uploadImage = (fieldName) => async (e) => {
//     setUploading(true);
//     try {
//       await handleFileUpdate(e, fieldName);
//     } catch (err) {
//       console.error("Upload error:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

  const color = "#108515";

  return (
    <div className="position-relative">
      <div id="mainCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          {["https://images.unsplash.com/photo-1586985289906-406988974504?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=1292&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1705433052895-752216a6a0f5?q=80&w=1170&auto=format&fit=crop"].map((img, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <img src={img} className="d-block w-100" alt={`Slide ${index + 1}`} style={{ height: '800px', objectFit: 'cover' }} />
              <div
                className="carousel-caption d-flex flex-column justify-content-center align-items-center"
                style={{
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  position: 'absolute',
                  backgroundColor: 'rgba(16, 133, 21, 0.25)',
                  zIndex: 2
                }}
              >
                <h1
                  className={`${isMobile ? 'fw-bold fs-3 px-2 text-center' : 'display-5 fw-bold px-5'}`}
                  style={{ color: 'white', maxWidth: '900px' }}
                  data-aos="fade-up"
                  data-aos-duration="1500"
                >
                  An awful lot of experts think that the Akhuwat Foundation Loan Program is one of the best ways to get a loan in Pakistan.
                </h1>
                {/* <Link
                  className="btn btn-light mt-4"
                  to="loan-form"
                  role="button"
                  style={{ backgroundColor: '#108515', color: 'white' }}
                >
                  Apply Loan
                </Link> */}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Carousal2
