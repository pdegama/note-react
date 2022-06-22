const Alert = (e) => {
  return (
    <div class={"pop-alert " + (e.show ? "pop-alert-show" : "") + (e.top ? " pop-alert-top" : " pop-alert-bottom")}>
      <div class={`pop-${e.color} pop-mass`}>
        <div  dangerouslySetInnerHTML={{ __html: e.massage }}>
          
        </div>
        <div>
          <button class="pop-btn" onClick={e.event}><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
    </div>
  )
}

export default Alert;
