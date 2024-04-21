import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    name: z.string(),
    email: z.string()
        .min(1, { message: "This is too short for an email" })
        .email("This is not a valid email"),
    number: z.number()
        .min(1, { message: "This is too short for a phone number" }),
    message: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
        router.push("/contact");
    };

    return (
        <div>
            <h1>Tell us your message.</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Username :</label>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        autoComplete="off"
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email address :</label>
                    <input
                        {...register("email", { required: true })}
                        type="text"
                        id="email"
                        placeholder="Enter your email address"
                        autoComplete="off"
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="number">Phone number :</label>
                    <input
                        {...register("number", { required: true })}
                        type="text"
                        id="number"
                        placeholder="Enter your phone number"
                        autoComplete="off"
                    />
                    {errors.number && <p>{errors.number.message}</p>}
                </div>
                <div>
                    <label htmlFor="message">Message :</label>
                    <input
                        {...register("message", { required: false })}
                        type="text"
                        id="message"
                        placeholder="Enter your message"
                        autoComplete="off"
                    />
                    {errors.message && <p>{errors.message.message}</p>}
                </div>
                <button type="submit" disabled = {!isDirty || !isValid || !isSubmitting}>
                    Submit
                </button>
            </form>
        </div>
    );
}
