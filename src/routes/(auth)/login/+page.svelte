<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { BarChart3, Mail, Lock, Loader2 } from "lucide-svelte";
    import { apiRequest } from "$lib/utils/request";
    import { PUBLIC_URL_API } from "$env/static/public";

    let email = $state("");
    let password = $state("");
    let loading = $state(false);
    let error = $state("");

    async function handleSubmit(e: Event) {
        e.preventDefault();
        error = "";

        if (!email || !password) {
            error = "Preencha todos os campos";
            return;
        }

        loading = true;

        try {
            const data = await apiRequest(
                `${PUBLIC_URL_API}/api/v1/auth/login`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                },
            );
            const { status } = data;

            switch (status) {
                case 400:
                    error = "Usuário não encontrado.";
                    break;
                case 401:
                    error = "Usuário ou senha incorretos.";
                    break;
                case 200:
                    await invalidateAll();
                    goto("/dashboard");
                    break;
            }
        } catch (err: any) {
            error = err.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="login-page">
    <div class="login-card">
        <div class="login-header">
            <div class="logo">
                <div class="logo-icon">
                    <BarChart3 size={28} />
                </div>
                <span class="logo-text">TrackyFlow</span>
            </div>
            <h1 class="login-title">Bem-vindo de volta</h1>
            <p class="login-subtitle">Acesse sua conta para continuar</p>
        </div>

        <form class="login-form" onsubmit={handleSubmit}>
            {#if error}
                <div class="error-message">
                    {error}
                </div>
            {/if}

            <div class="input-group">
                <label class="input-label" for="email">Email</label>
                <div class="input-wrapper">
                    <Mail size={18} class="input-icon" />
                    <input
                        type="email"
                        id="email"
                        class="input input-with-icon"
                        placeholder="seu@email.com"
                        bind:value={email}
                        disabled={loading}
                    />
                </div>
            </div>

            <div class="input-group">
                <label class="input-label" for="password">Senha</label>
                <div class="input-wrapper">
                    <Lock size={18} class="input-icon" />
                    <input
                        type="password"
                        id="password"
                        class="input input-with-icon"
                        placeholder="Sua senha"
                        bind:value={password}
                        disabled={loading}
                    />
                </div>
            </div>

            <button
                type="submit"
                class="btn btn-primary btn-full"
                disabled={loading}
            >
                {#if loading}
                    <Loader2 size={18} class="spinner" />
                    Entrando...
                {:else}
                    Entrar
                {/if}
            </button>

            <a href="#forgot" class="forgot-link">Esqueci minha senha</a>
        </form>
    </div>

    <div class="login-footer">
        <p>TrackyFlow Analytics - Todos os direitos reservados</p>
    </div>
</div>

<style>
    .login-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: var(--bg);
        background-image: radial-gradient(
                ellipse at top,
                rgba(59, 130, 246, 0.08) 0%,
                transparent 50%
            ),
            radial-gradient(
                ellipse at bottom right,
                rgba(59, 130, 246, 0.05) 0%,
                transparent 50%
            );
    }

    .login-card {
        width: 100%;
        max-width: 420px;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 48px 40px;
        box-shadow: var(--shadow);
    }

    .login-header {
        text-align: center;
        margin-bottom: 40px;
    }

    .logo {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 32px;
    }

    .logo-icon {
        width: 52px;
        height: 52px;
        background: linear-gradient(
            135deg,
            var(--primary) 0%,
            var(--primary-2) 100%
        );
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .logo-text {
        font-family: var(--font-title);
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-strong);
    }

    .login-title {
        font-size: 1.5rem;
        margin-bottom: 8px;
    }

    .login-subtitle {
        color: var(--muted);
        font-size: 0.9375rem;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .error-message {
        padding: 14px 18px;
        background: var(--danger-soft);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: var(--radius-sm);
        color: var(--danger);
        font-size: 0.875rem;
        text-align: center;
    }

    .input-wrapper {
        position: relative;
    }

    .input-wrapper :global(.input-icon) {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--muted);
        pointer-events: none;
    }

    .input-with-icon {
        padding-left: 48px;
    }

    .btn-full {
        width: 100%;
        padding: 16px 24px;
        font-size: 1rem;
        margin-top: 8px;
    }

    .btn-full:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    :global(.spinner) {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .forgot-link {
        text-align: center;
        font-size: 0.875rem;
        color: var(--muted);
        transition: color 0.2s ease;
    }

    .forgot-link:hover {
        color: var(--primary);
    }

    .login-footer {
        margin-top: 32px;
        text-align: center;
    }

    .login-footer p {
        font-size: 0.8125rem;
        color: var(--muted);
    }

    @media (max-width: 480px) {
        .login-card {
            padding: 32px 24px;
        }
    }
</style>
