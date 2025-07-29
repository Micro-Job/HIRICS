import { useState } from "react";
import Incognito from "../../assets/images/incognito.png";
import User from "../../assets/images/user.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import "./CommentsModal.css";

export default function CommentsModal({ open, onOpenChange }) {
  const [step, setStep] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTypeSelect = (anon) => {
    setIsAnonymous(anon);
  };

  const onClose = (open) => {
    setStep(1);
    setIsAnonymous(false);
    setName("");
    setComment("");
    onOpenChange(open);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/job/Feedback/CreateFeedback`,
        {
          method: "POST",
          body: JSON.stringify({
            fullName: isAnonymous ? undefined : name,
            email: isAnonymous ? undefined : email,
            content: comment,
            isAnonym: isAnonymous,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }
      onClose(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isAnonymous) {
      return comment.trim() !== "";
    }

    return (
      comment.trim() !== "" && name.trim() !== "" && emailRegex.test(email)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Təklif və iradlarınızı bildirin</DialogTitle>
        </DialogHeader>

        {/*
          STEP 1: choose anonymous vs public
        */}
        {step === 1 && (
          <>
            <div className="comments-modal__description">
              <p>
                Platformanı daha faydalı və istifadəyə uyğun hala gətirmək üçün
                sizdən gələn fikirlərə ehtiyacımız var. Təklifinizi anonim
                şəkildə və ya adınızı qeyd edərək bizimlə bölüşə bilərsiniz.
              </p>
              <p>
                Hansı formada olursa olsun — fikiriniz bizim üçün dəyərlidir.
              </p>
            </div>

            <div className="comments-modal__actions">
              <label
                className="comments-modal__action"
                onClick={() => handleTypeSelect(true)}
              >
                <input
                  type="radio"
                  name="commentType"
                  checked={isAnonymous === true}
                  readOnly
                  className="comments-modal__radio-input"
                />
                <span className="comments-modal__radio-custom" />
                <div className="comments-modal__icon-wrapper">
                  <img src={Incognito} alt="" />
                </div>
                <span className="comments-modal__label">
                  Anonim olaraq paylaşmaq
                </span>
              </label>

              <label
                className="comments-modal__action"
                onClick={() => handleTypeSelect(false)}
              >
                <input
                  type="radio"
                  name="commentType"
                  checked={isAnonymous === false}
                  readOnly
                  className="comments-modal__radio-input"
                />
                <span className="comments-modal__radio-custom" />
                <div className="comments-modal__icon-wrapper">
                  <img src={User} alt="" />
                </div>
                <span className="comments-modal__label">
                  Açıq şəkildə paylaşmaq
                </span>
              </label>
            </div>

            <button
              className="comments-modal__submit-button"
              onClick={() => setStep(2)}
            >
              Göndər
            </button>
          </>
        )}

        {/*
          STEP 2: collect name (if public) and comment
        */}
        {step === 2 && (
          <>
            <div className="comments-modal__actions">
              {!isAnonymous && (
                <div className="comments-modal__input-group">
                  <label className="comments-modal__input-label" htmlFor="name">
                    Adınız soyadınız
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Adınız soyadınızı daxil edin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="comments-modal__input"
                  />
                </div>
              )}

              {!isAnonymous && (
                <div className="comments-modal__input-group">
                  <label
                    className="comments-modal__input-label"
                    htmlFor="email"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="E-mailinizi daxil edin"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="comments-modal__input"
                  />
                </div>
              )}

              <div className="comments-modal__input-group">
                <label
                  className="comments-modal__input-label"
                  htmlFor="comment"
                >
                  Mesajınız
                </label>
                <textarea
                  id="comment"
                  placeholder="Bizə yazmaq istədiyiniz mesajı yazın"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="comments-modal__textarea"
                />
              </div>
            </div>

            <button
              className="comments-modal__submit-button"
              disabled={!isValid() || isLoading}
              onClick={handleSubmit}
            >
              {isLoading && <span className="comments-modal__spinner" />}
              Göndər
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
