<script lang="ts">
    export let text: string = "Carregando...";
</script>

<div class="loader-container">
    <div class="spinner"></div>
    <p>{text}</p>
</div>

<style>
    .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 24px;
    }

    .spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-top: 3px solid #7c3aed;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    p {
        font-size: 14px;
        color: #666;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
