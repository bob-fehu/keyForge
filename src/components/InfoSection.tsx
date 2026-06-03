import { Shield, TrendingUp, Lock, Clock } from "lucide-react";
import { motion } from "framer-motion";

const CARDS = [
  {
    icon: Shield,
    label: "Secure",
    text: "Passwords are generated using the browser's Web Crypto API. Characters are selected with rejection sampling to ensure uniform distribution and avoid modulo bias.",
  },
  {
    icon: TrendingUp,
    label: "Entropy",
    text: "Entropy measures the size of your password's search space. N is the total number of available characters in your selected set. Each additional character multiplies the keyspace by N, so a 12-character password from 94 characters gives 94^12, or roughly 475 trillion possible combinations.",
  },
  {
    icon: Clock,
    label: "Time to crack",
    text: "The brute-force time is calculated assuming 10^15 guesses per second, roughly what a large GPU cluster could achieve against a fast hash like MD5. For real-world hashes like bcrypt or Argon2, the actual time would be orders of magnitude higher.",
  },
  {
    icon: Lock,
    label: "Private",
    text: "Everything runs locally in your browser. No data is sent to any server, stored, or logged.",
  },
];

const FADE_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const InfoSection = () => {
  return (
    <section className="relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-10 pt-24 pb-16">
      {/* Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-lg h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-2">
          How it works
        </h2>
        <p className="text-sm text-neutral-500 max-w-sm mx-auto">
          Four things that make KeyForge different.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            variants={FADE_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group rounded-xl border border-neutral-800 bg-neutral-950/60 backdrop-blur-sm p-5 hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <card.icon className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                {card.label}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
