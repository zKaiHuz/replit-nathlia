import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema } from "@shared/schema";
import type { InsertLead } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LeadForm() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateLead();
  
  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: InsertLead) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="cta" 
          size="xl" 
          className="w-full max-w-md mx-auto group relative overflow-hidden"
        >
          <span className="relative z-10">QUERO MINHA VAGA</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            Garanta sua vaga
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Entre na lista de espera para receber acesso exclusivo.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Input
              {...form.register("email")}
              placeholder="Seu melhor e-mail"
              type="email"
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 h-12 focus-visible:ring-primary"
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm font-medium">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            variant="cta" 
            size="lg" 
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Entrar na Lista VIP"
            )}
          </Button>
          
          <p className="text-xs text-center text-zinc-500">
            Seus dados estão 100% seguros. Livre de spam.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
