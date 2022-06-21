const Alert = (e) => {
  return(
    <div class={"pop-alert " + (e.show ? "pop-alert-show" : "")}>
      <div class={`pop-${e.color} pop-mass`}>
        {e.massage}
        <button class="pop-btn" onClick={e.event}><i class="bi bi-x-lg"></i></button>
      </div>
    </div>
  )
}

export default Alert;
