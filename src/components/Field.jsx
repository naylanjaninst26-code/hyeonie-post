export default function Field({ label, error, hint, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {error ? (
        <small className="error" role="alert">{error}</small>
      ) : (
        hint && <small className="hint">{hint}</small>
      )}
    </label>
  );
}