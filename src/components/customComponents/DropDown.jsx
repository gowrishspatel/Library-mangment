import React from "react";

export const DropDown =(props)=>{
    const {profileRef,open,name,label,label2,handleOpen,handleLogout} = props;
    return(
        <>

            {/* Profile dropdown: opens/closes on click; outside click closes it */}
            <div className="profile-container" ref={profileRef}>
              <button
                className="btn profile-btn"
                onClick={(e) => handleOpen(e)}
                aria-haspopup="true"
              >
                {label}
            </button>

              {open && (
                <div className="dropdown-menu" role="menu">
                  <div className="dropdown-item user-id">Name: {name}</div>
                  <button
                    className="dropdown-item logout-btn btn"
                    onClick={handleLogout}
                  >
                    {label2}
                  </button>
                </div>
              )}
            </div>
          </>
    )
}