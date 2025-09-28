import React from "react";

export const DropDown =(props)=>{
    const {profileRef,open,name,label,label2,handleOpen,handleLogout} = props;
    return(
        <>

            {/* Profile dropdown: opens/closes on click; outside click closes it */}
            <div className="profile-container" ref={profileRef}>
              <div
                className={open ? 'profile-btn-active': 'profile-btn'}
                onClick={(e) => handleOpen(e)}
                aria-haspopup="true"
              >
                {label}
            </div>

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