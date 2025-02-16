import React, { useState } from "react";
import { InternalLink } from "../buttons/InternalLink";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";

// Interface para tipos de errores
interface FormErrors {
  fullName?: string;
  documentId?: string;
  phone?: string;
  town?: string;
  problemDescription?: string;
  privacyPolicy?: string;
}

const ConsultaForm: React.FC = () => {
  // Estado principal del formulario
  const [formData, setFormData] = useState({
    fullName: "",
    documentId: "",
    email: "",
    phone: "",
    problemDescription: "",
    town: "",
    contactMethod: "",
    privacyPolicy: false,
  });

  // Estados para manejo de errores, carga y mensajes
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Función de validación del formulario
  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Validación para Nombre completo
    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre completo es obligatorio";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,60}$/.test(formData.fullName)) {
      newErrors.fullName = "Debe contener entre 3 y 60 letras (sin números)";
    }

    // Validación para Documento de identidad
    if (!formData.documentId.trim()) {
      newErrors.documentId = "El documento de identidad es obligatorio";
    } else if (!/^\d{6,10}$/.test(formData.documentId)) {
      newErrors.documentId = "Debe contener entre 6 y 10 números";
    }

    // Validación para WhatsApp
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Debe contener exactamente 10 números";
    }

    // Validación para Municipio
    if (!formData.town.trim()) {
      newErrors.town = "La ciudad es obligatoria";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,40}$/.test(formData.town)) {
      newErrors.town = "Debe contener entre 3 y 40 letras (sin números)";
    }

    // Validación para Descripción del problema
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = "La descripción del caso es obligatoria";
    }

    // Validación para Política de privacidad
    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = "Debes aceptar la política de privacidad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://sotoargel-asociados.onrender.com/api/consultas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `Consulta registrada y correos enviados con éxito. Radicado: ${data.Radicado}`
        );
        // Resetear formulario
        setFormData({
          fullName: "",
          documentId: "",
          email: "",
          phone: "",
          problemDescription: "",
          town: "",
          contactMethod: "",
          privacyPolicy: false,
        });
        setErrors({});
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al enviar la consulta:", error);
      setMessage("Error al enviar la consulta.");
    }
    setLoading(false);
  };

  // Manejo de cambios en los campos
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    let filteredValue = value;

    // Filtrado de entrada según el campo
    switch (name) {
      case "fullName":
        filteredValue = value
          .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "")
          .slice(0, 60);
        break;

      case "town":
        filteredValue = value
          .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "")
          .slice(0, 40);
        break;

      case "documentId":
        filteredValue = value.replace(/\D/g, "").slice(0, 10);
        break;

      case "phone":
        filteredValue = value.replace(/\D/g, "").slice(0, 10);
        break;
    }

    // Limpiar errores al modificar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Actualizar estado
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    }
  };

  // Clases CSS reutilizables
  const labelClassName = "text-zinc-400 text-sm";
  const inputContainerClassName = "flex flex-col gap-1 w-full";
  const inputClassName =
    "border-2 rounded-md border-zinc-300 px-3 py-2 text-base transition-all focus:outline-none focus:border-blue-400 focus:shadow-md";
  const errorClassName = "text-red-500 text-sm mt-1";
  const requiredStar = <span className="text-red-500">*</span>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-5">
      {/* Sección 1: Nombre y Documento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={inputContainerClassName}>
          <label className={labelClassName}>
            Nombre completo {requiredStar}
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`${inputClassName} ${
              errors.fullName ? "border-red-400" : ""
            }`}
            placeholder="Santiago Martínez"
          />
          {errors.fullName && (
            <span className={errorClassName}>{errors.fullName}</span>
          )}
        </div>

        <div className={inputContainerClassName}>
          <label className={labelClassName}>
            Número de documento {requiredStar}
          </label>
          <input
            type="text"
            name="documentId"
            value={formData.documentId}
            onChange={handleChange}
            className={`${inputClassName} ${
              errors.documentId ? "border-red-400" : ""
            }`}
            placeholder="123456789"
          />
          {errors.documentId && (
            <span className={errorClassName}>{errors.documentId}</span>
          )}
        </div>
      </div>

      {/* Sección 2: Email y Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={inputContainerClassName}>
          <label className={labelClassName}>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClassName}
            placeholder="user@email.com"
          />
        </div>

        <div className={inputContainerClassName}>
          <label className={labelClassName}>WhatsApp {requiredStar}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${inputClassName} ${
              errors.phone ? "border-red-400" : ""
            }`}
            placeholder="3003123123"
          />
          {errors.phone && (
            <span className={errorClassName}>{errors.phone}</span>
          )}
        </div>
      </div>

      {/* Sección 3: Ciudad y Contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={inputContainerClassName}>
          <label className={labelClassName}>
            Municipio de residencia {requiredStar}
          </label>
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleChange}
            className={`${inputClassName} ${
              errors.town ? "border-red-400" : ""
            }`}
            placeholder="Puerto Berrío"
          />
          {errors.town && <span className={errorClassName}>{errors.town}</span>}
        </div>

        <div className={inputContainerClassName}>
          <label className={labelClassName}>
            ¿Cómo prefieres que te contactemos? {requiredStar}
          </label>
          <select
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            className={`${inputClassName} bg-white`}
          >
            <option value="">Seleccione una opción</option>
            <option value="email">Correo electrónico</option>
            <option value="phone">WhatsApp</option>
          </select>
        </div>
      </div>

      {/* Sección 4: Descripción del problema */}
      <div className={inputContainerClassName}>
        <label className={labelClassName}>
          Describe brevemente tu caso {requiredStar}
        </label>
        <p className="text-gray-500 text-sm mb-2">
          Te recomendamos enumerar los hechos que consideres importantes en
          orden cronológico.
        </p>
        <textarea
          name="problemDescription"
          value={formData.problemDescription}
          onChange={handleChange}
          className={`${inputClassName} h-40 resize-none ${
            errors.problemDescription ? "border-red-400" : ""
          }`}
          placeholder={`Ejemplo:\n1. El 1 de enero de 2021, me despidieron de mi trabajo.\n2. Al día siguiente, me enteré que mi esposa estaba embarazada.`}
        />
        {/* Advertencia para mejorar la asesoría */}
        <p className="text-blue-600 text-sm mt-2 italic">
          Recuerda que la asesoría se brindará únicamente con base en la
          información que nos suministres. Entre más detalles proporciones sobre
          tu caso, más precisa y efectiva será nuestra orientación legal.
        </p>
        {errors.problemDescription && (
          <span className={errorClassName}>{errors.problemDescription}</span>
        )}
      </div>

      {/* Sección 5: Política de privacidad */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          name="privacyPolicy"
          checked={formData.privacyPolicy}
          onChange={handleChange}
          className="h-5 w-5 accent-blue-500"
        />
        <label className="text-zinc-400 text-sm">
          Autorizo{" "}
          <InternalLink href="legal/autorizacion-tratamiento-de-datos">
            tratamiento de mis datos personales
          </InternalLink>
          {requiredStar}
        </label>
        {errors.privacyPolicy && (
          <span className={`${errorClassName} ml-2`}>
            {errors.privacyPolicy}
          </span>
        )}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 mx-auto bg-blueTertiary text-white font-bold py-3 px-8 rounded-md shadow-md transition-all hover:shadow-lg disabled:opacity-50 w-full md:w-auto"
      >
        {loading ? "Enviando..." : "Enviar consulta"}
      </button>

      {/* Mensajes de feedback */}
      {message && (
        <p
          className={`text-sm mt-4 text-center ${
            message.includes("Error") ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Enlaces legales */}
      <p className="text-customGray text-center ">
        Al enviar el formulario estas aceptando nuestra{" "}
        <Link
          className="text-blue-400"
          href="legal/politica-de-tratamiento-de-datos"
        >
          política de tratamiento de datos
        </Link>
        .
      </p>

      {/* Soporte WhatsApp */}
      <div className="flex mx-auto text-customGray text-sm gap-2">
        <AiOutlineInfoCircle className="hidden md:flex my-auto" />
        <p className="text-center items-center ">
          ¿Estas teniendo problemas con el formulario?{" "}
          <a
            className="text-blue-500 font-bold"
            href="https://wa.link/6xtfw7"
            target="_blank"
            rel="noreferrer"
          >
            Escríbenos por WhatsApp
          </a>
          .
        </p>
      </div>
    </form>
  );
};

export default ConsultaForm;
