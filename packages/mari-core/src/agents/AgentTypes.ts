export interface Agent {
  id: string
  role: string
  execute(input: string): string
}
